import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: "That username is taken already!",
    required: "Username is required",
    trim: true,
    max: 10,
    match: [
      /^[a-zA-Z0-9]+$/,
      "Name can only contain numbers and letters, NO SPECIAL CHARACTERS!",
    ],
  },
  email: {
    type: String,
    unique: "Email already exists",
    match: [/.+\@.+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  favorites: {
    type: Array,
  },
  progress: {
    type: String,
  },
  longestStreak: {
    type: Array,
  },
  totalSessions: {
    type: Number,
    default: 0,
  },
  mindfulMinutes: {
    type: String,
    default: "No time meditating yet!",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  longest: {
    type: Number,
    default: 0,
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be at least 8 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

export default mongoose.model("User", UserSchema);
