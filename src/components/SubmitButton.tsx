import {ReactNode} from "react";
import {useFormStatus} from 'react-dom';

export default function SubmitButton({children}:{children:ReactNode}) {
  const {pending} = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        className={(pending ? 'bg-gray-400' : 'bg-blue-600') + " mt-2 text-white px-6 py-2 rounded"}>
        {pending && (
          <span>Saving...</span>
        )}
        {!pending && (
          <span>
            {children}
          </span>
        )}
      </button>
    </>
  );
}