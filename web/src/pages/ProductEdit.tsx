import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { storage } from "../firebase/firebase";
import {
  fetchProductById,
  fetchProducts,
  selectProduct,
  updateProduct,
} from "../redux/product";
import { ProductType } from "../redux/types";
import { selectUser } from "../redux/user";

interface MatchProps {
  id: string;
}

const ProductEdit = ({ match, history }: RouteComponentProps<MatchProps>) => {
  const productId = match.params.id;
  const dispatch = useAppDispatch();
  const {
    productDetail: { product, loading: detailLoading },
  } = useAppSelector(selectProduct);

  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!product?.name || product._id !== productId) {
      dispatch(fetchProductById(productId));
    }
  }, [history, productId, product, dispatch]);

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 僅上傳圖片，表單還沒送出
    e.preventDefault();
    const file = e.target.files![0];
    setImage(file);
  };

  const uploadImageHandler = async (values: ProductType) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `image/${image!.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image!, metadata);
    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await dispatch(
          updateProduct({
            product: { ...values, image: downloadURL },
            token: userInfo?.token!,
          })
        );
      });
    });
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-md shadow-md py-8 px-16 mx-auto">
      <h1 className="font-bold text-3xl mb-6">商品編輯</h1>

      {!detailLoading && product && (
        <Formik
          initialValues={{
            ...product,
          }}
          onSubmit={async (values) => {
            if (image) {
              await uploadImageHandler(values);
            } else {
              await dispatch(
                updateProduct({
                  product: { ...values },
                  token: userInfo?.token!,
                })
              );
            }
            // 更新完列表要重整
            dispatch(fetchProducts({}));
            history.push("/admin/productlist");
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-y-2">
              <div className="w-full md:w-1/2 px-3">
                <label className="form-label">商品名稱</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Iphone 12 mini"
                  className="form-input"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label className="form-label">價格</label>
                <input
                  type="text"
                  name="price"
                  placeholder="33000"
                  className="form-input"
                  onChange={handleChange}
                  value={values.price}
                />
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label className="form-label">種類</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Electronics"
                  className="form-input"
                  onChange={handleChange}
                  value={values.category}
                />
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label className="form-label">庫存</label>
                <input
                  type="text"
                  name="stock"
                  placeholder="0"
                  className="form-input"
                  onChange={handleChange}
                  value={values.stock}
                />
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label className="form-label">品牌</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Apple"
                  className="form-input"
                  onChange={handleChange}
                  value={values.brand}
                />
              </div>

              <div className="w-full px-3">
                <label className="form-label">商品描述</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Nice Phone"
                  className="form-input"
                  onChange={handleChange}
                  value={values.description}
                />
              </div>

              <div className="w-full px-3">
                <label className="form-label">照片</label>
                <input type="file" onChange={uploadFileHandler} />
              </div>

              <button
                className="px-4 py-2 bg-main rounded-md shadow-md text-white ml-auto hover:bg-green-600 hover:scale-105 transition duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                更新
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProductEdit;
