import { Eye, Sparkles, Download } from "lucide-react";

const Workflow = () => {
  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-2">How it works</h2>
      <p className="text-center text-lg mb-6">
        Transform Words Into Stunning Images
      </p>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="border rounded-lg p-4 shadow-md flex items-center space-x-4">
          <div className="bg-gray-300 p-2 rounded-full">
            <Eye size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Describe Your Vision</h3>
            <p className="text-gray-600">
              Type a phrase, sentence, or paragraph that describes the image you
              want to create.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border rounded-lg p-4 shadow-md flex items-center space-x-4">
          <div className="bg-gray-300 p-2 rounded-full">
            <Sparkles size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Watch the Magic</h3>
            <p className="text-gray-600">
              Our AI-powered engine will transform your text into a
              high-quality, unique image in seconds.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border rounded-lg p-4 shadow-md flex items-center space-x-4">
          <div className="bg-gray-300 p-2 rounded-full">
            <Download size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Download & Share</h3>
            <p className="text-gray-600">
              Instantly download your creation or share it with the world
              directly from our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
