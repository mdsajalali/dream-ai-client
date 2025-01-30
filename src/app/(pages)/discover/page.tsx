import { Download, Share, Copy, Heart } from "lucide-react";

const Discover = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl">
        {/* Image Placeholder */}
        <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center rounded-md overflow-hidden shadow-md">
          <img
            src="https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg"
            alt="Discover"
            className="w-full h-full object-cover"
          />

          {/* Icons */}
          <div className="absolute bottom-3 right-3 flex gap-3">
            <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
              <Download className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
              <Share className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
              <Copy className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
              <Heart className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 mt-4 ">
        <input
          type="text"
          placeholder="This is Discover what you want to generate"
          className="flex-1 p-2 text-sm rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Generate
        </button>
      </div>
    </div>
  );
};

export default Discover;
