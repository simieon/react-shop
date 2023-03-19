import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryItem } from "../../home/types";
import { IProductCreate, IProductEdit, IProductItem } from "../types";
import { FaTrash } from "react-icons/fa";
import Loader from "../../Loader";

const ProductEditPage = () => {
    const [oldImages, setOldImages] = useState<string[]>([]);
    const [categories, setCategories] = useState<Array<ICategoryItem>>([]);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      setIsLoading(true);
      axios
        .get<Array<ICategoryItem>>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`)
        .then((resp) => {
          console.log("resp = ", resp);
          setCategories(resp.data);
          setIsLoading(false);
        })
        .catch(err=>{
          console.log(err);
          setIsLoading(false);
        });
      axios
      .get<IProductItem>(`${APP_ENV.REMOTE_HOST_NAME}api/products/${id}`)
      .then((resp) => {
        const {files, name, price, category_id, description} = resp.data;
        setOldImages(files);
        setModel({...model, name, price, description, category_id});
        console.log("data", resp.data);
      });
      
    }, []);

    const navigator = useNavigate();

    const [model, setModel] = useState<IProductEdit>({
        name: "",
        price: 0,
        category_id: "",
        description: "",
        removeFiles:[],
        files: []
    });
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>|
       ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        setModel({...model, [e.target.name]: e.target.value});
    }

    const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log("Select files: ", e.target.files);
        const {target} = e;
        const {files} = target;
        if(files) {
            const file = files[0];
            setModel({...model, files: [...model.files, file]});
        }
        target.value="";
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const item = await axios.put(
          `${APP_ENV.REMOTE_HOST_NAME}api/products/${id}`,
          model,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(()=>{
          setIsLoading(false);
        })
        console.log("Server save category", item);
        navigator("/");
      } catch (error: any) {
        console.log("Щось пішло не так", error);
        setIsLoading(false);
      }
      
    };

    const dataFileView = model.files.map((file,index)=>
        <img key={index} src={URL.createObjectURL(file)}/>
    );

    const buttonClearImages = () =>{
        setModel({...model, files: []});
    }

    const contentCategories = categories.map((category) => (
      <option key={category.id} value={category.id}>{category.name}</option>
    ));

    const DeleteProductOldImagesHandler = (imageSrc: string) => {
      setModel({...model, removeFiles: [...model.removeFiles, imageSrc]});
      setOldImages(oldImages.filter(x=>x!==imageSrc));
    };
  
    const DataProductsOld = oldImages.map((product, index) => (
      <div key={index} className="inline  m-2 ">
        <div
          style={{ cursor: "pointer" }}
          className="flex justify-center ... border-2 border-black  rounded-lg ... "
          onClick={(e) => {
            DeleteProductOldImagesHandler(product);
          }}
        >
          <FaTrash className="m-2 " />
        </div>
        <div className="p-2">
          <img
            className=" w-20 h-20 "
            src={`${APP_ENV.REMOTE_HOST_NAME}files/600_${product}`}
          ></img>
        </div>
      </div>
    ));
  return (
    isLoading ? <Loader loading={isLoading}/> 
    :
    <>
      <div className="p-8 rounded border border-gray-200">
        <h1 className="font-medium text-3xl">Add product</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mt-8 grid lg:grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={model.name}
                id="name"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                onChange={onChangeHandler}
                value={model.price}
                id="price"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Вкажіть ціну"
              />
            </div>
            
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Category
              </label>
              <select
                value={model.category_id}
                onChange={onChangeHandler}
                id="category_id"
                name="category_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {contentCategories}
              </select>
            </div>


            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={onChangeHandler}
                value={model.description}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write any words here..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>

              <div className="mt-1 flex items-center">
                <label
                  htmlFor="selectImage"
                  className="inline-block w-20 overflow-hidden bg-gray-100"
                >
                  {dataFileView}
                </label>
                <label
                  htmlFor="selectImage"
                  className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Select image
                </label>

                <button className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={buttonClearImages}>
                    Clear
                </button>
              </div>

              <div className="mt-1 flex items-center">
                <label className="flex ">
                  <>{DataProductsOld}</>
                </label>
              </div>

              <input
                type="file"
                id="selectImage"
                onChange={onFileHandler}
                className="hidden"
              />
            </div>
          </div>
          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Edit
            </button>
            <Link
              to="/"
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              Main page
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEditPage;