import type { FC } from "react";

interface GradientProps {
  code: string;
  prompt: string;
}

const Gradient: FC<GradientProps> = ({
  code ,
  prompt = "No prompt",
}) => {
  return (
    <div className=" m-4 w-max rounded border border-gray-800 transition-all hover:border-gray-700 max-w-[12rem] ">
      <div
        className="h-48 w-48 rounded shadow-xl"
        style={{
          background: code.replace(";", ""),
        }}
      ></div>

      <span className="block p-1 text-xs text-center  overflow-auto whitespace-pre-wrap text-gray-500">{prompt}</span>

      <div className="max-w-[12rem] overflow-hidden rounded bg-black p-4">
        <code
          className="
            overflow-auto whitespace-pre-wrap
            text-xs
            text-gray-400
        "
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard
                .writeText(code)
                .then(() => {
                  alert("Copied to clipboard");
                })
                .catch(() => {
                  alert("Failed to copy to clipboard");
                });
            } else {
              alert(
                "Failed to copy to clipboard. Please use a modern browser."
              );
            }
          }}
        >
          {code} <span className="mt-2 block text-gray-500">Click to copy</span>
        </code>
      </div>
    </div>
  );
};
export default Gradient;
