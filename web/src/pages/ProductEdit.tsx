import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchProductById,
  selectProduct,
  updateProduct,
} from "../redux/product";
import { selectUser } from "../redux/user";

interface MatchProps {
  id: string;
}

const ProductEdit = ({ match }: RouteComponentProps<MatchProps>) => {
  const productId = match.params.id;
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useAppDispatch();
  const {
    productUpdate,
    productDetail: { product, loading: detailLoading },
  } = useAppSelector(selectProduct);

  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [match]);

  const uploadFileHandler = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-md shadow-md py-8 px-16 mx-auto">
      <h1 className="font-bold text-3xl mb-6">商品編輯</h1>

      {!detailLoading && product && (
        <Formik
          initialValues={{
            ...product,
          }}
          onSubmit={(values) => {
            dispatch(
              updateProduct({
                product: { ...product, image },
                token: userInfo?.token!,
              })
            );
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
                <input
                  type="text"
                  name="image"
                  placeholder="iphone12.jpg"
                  className="form-input"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
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
