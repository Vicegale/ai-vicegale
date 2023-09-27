import { getTaskDefinition } from './actions';

export default async function Page({ params }: { params: { id: number } }) {
    const definition = await getTaskDefinition(params.id);

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Task Definition</h2>
            <div className="mb-4">
                <p className="text-gray-400 text-lg">Prompt:</p>
                <p className="text-xl font-semibold">{definition?.prompt}</p>
            </div>
            <div className="flex flex-row">
                <div className="w-1/2 pr-4">
                    <p className="text-gray-400 text-lg">Input Parameters:</p>
                    <ul className="list-disc pl-6">
                    {definition?.inputParams.map((i, idx) => <li key={idx}>{i.value}</li>)}
                    </ul>
                </div>
                <div className="w-1/2">
                    <p className="text-gray-400 text-lg">Output Parameters:</p>
                    <ul className="list-disc pl-6">
                    {definition?.outputParams.map((i, idx) => <li key={idx}>{i.value}</li>)}
                    </ul>
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button className="bg-white text-gray-800 hover:bg-gray-300 font-semibold py-2 px-4 rounded-md">
                    Launch
                </button>
            </div>
        </div>
    );
}
