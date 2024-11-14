import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile } from "../actions/upload";
import { Textarea } from "@/components/ui/textarea";

export default function UploadPage() {
    return <div className="flex gap-3 flex-col mx-auto max-w-[500px]">
        <h1>Upload a file</h1>
        <form action={uploadFile} className="flex flex-col gap-3">
            <Input id="file" name="file" type="file" />
            <label htmlFor="title">Title</label>
            <Input id="title" name="title" />
            <label htmlFor="description">Description</label>
            <Textarea id="description" name="description" />
            <Button type={'submit'} variant={"outline"} className={"border-primary hover:bg-black hover:text-white"} >Upload</Button>
        </form>
    </div>
}