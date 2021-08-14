import * as Yup from "yup";

export const registerValidation = async (data: {
  email: string;
  password: string;
}) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "名稱不能小於3個字元")
      .max(10, "名稱不能超過10個字元")
      .required("名稱欄位不可為空"),
    password: Yup.string()
      .min(6, "密碼不可小於6個字元")
      .required("密碼欄位不可為空")
      .matches(/^[a-zA-Z0-9]{6,}$/, "密碼長度至少6個字元，不可包含特殊符號"),
    email: Yup.string().email("錯誤的信箱格式").required("信箱欄位不可為空"),
  });

  return await schema.isValid(data);
};

export const loginValidation = async (data: {
  email: string;
  password: string;
}) => {
  const schema = Yup.object().shape({
    email: Yup.string().email("錯誤的信箱格式").required("信箱欄位不可為空"),
    password: Yup.string().required("密碼欄位不可為空"),
  });

  return await schema.isValid(data);
};
