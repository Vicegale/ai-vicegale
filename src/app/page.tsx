import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (<>
        <>Hello World!</>
        <Link href="/task" >
            <Button>Go to your tasks.</Button>
        </Link>
    </>
    )
}
