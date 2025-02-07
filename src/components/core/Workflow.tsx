import { Eye, Sparkles, Download } from "lucide-react";

const Workflow = () => {
  return (
    <section className="mx-auto mb-10 max-w-2xl p-6">
      <h2 className="mb-2 text-center text-3xl font-bold">How it works</h2>
      <p className="mb-6 text-center text-lg">
        Transform Words Into Stunning Images
      </p>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="flex items-center space-x-4 rounded-lg border p-4 shadow-md">
          <div className="rounded-full bg-gray-300 p-2">
            <Eye size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Describe Your Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Type a phrase, sentence, or paragraph that describes the image you
              want to create.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-4 rounded-lg border p-4 shadow-md">
          <div className="rounded-full bg-gray-300 p-2">
            <Sparkles size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Watch the Magic</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI-powered engine will transform your text into a
              high-quality, unique image in seconds.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center space-x-4 rounded-lg border p-4 shadow-md">
          <div className="rounded-full bg-gray-300 p-2">
            <Download size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Download & Share</h3>
            <p className="text-gray-600 dark:text-gray-300">
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
