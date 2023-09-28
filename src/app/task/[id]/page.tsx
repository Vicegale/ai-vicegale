import TaskDisplay from './taskDisplay';

export default async function Page({ params }: { params: { id: number } }) {
    return (
    <TaskDisplay id={params.id}/>
    );
}
