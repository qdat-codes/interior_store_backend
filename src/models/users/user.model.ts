import { model, Schema } from "mongoose";
import { UserType } from "../../types/index.type";
import bcrypt from "bcrypt";

const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // tự  động thêm createAt và updateAt
  }
);

// hash  password trước  khi lưu
userSchema.pre("save", async function (next) {
  const user = this as UserType;
  // kiểm tra password có thay đổi gì hay không -> nếu không next
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// so sánh mật khẩu trước khi đăng nhập
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<UserType>("User", userSchema);
