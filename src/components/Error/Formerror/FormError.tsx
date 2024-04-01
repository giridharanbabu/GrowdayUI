import { propsType } from "../../../utils/types/propTypes";

const FormError = (props: propsType) => {
  const newArray = Object.keys(props.errors).map((key) => {
    return {
      key: key,
    };
  });
  const filteredArray = newArray.filter((item) =>
    ["name", "email", "password", "passwordConfirm"].includes(item.key)
  );

  console.log(filteredArray);
  return (
    <>
      {Object.keys(props.errors).length > 0 && (
        <div className="absolute z-50 top-2 left-0 right-0 w-max ml-auto mr-auto">
          <div
            className="flex m-5 mb-4 p-5 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Danger</span>
            <div>
              <span className="font-medium">
                User not registered or incorrect email/password.
              </span>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                {filteredArray.map((item, index) => (
                  <li key={index}>{item.key}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormError;
