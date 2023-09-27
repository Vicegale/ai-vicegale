import { getTaskDefinition } from './actions';

export default async function Page({ params }: { params: { id: number } }) {
    const definition = await getTaskDefinition(params.id);

    return (
        <div>
            <p>{definition?.prompt}</p>
            <div>
                <p>Inputs</p>
                <div>
                    {definition?.inputParams.map((i, idx) => <p key={idx}>{i.value}</p>)}
                </div>
            </div>
            <div>
                <p>Output</p>
                <div>
                    {definition?.outputParams.map((i, idx) => <p key={idx}>{i.value}</p>)}
                </div>
            </div>
        </div>

    );
}
