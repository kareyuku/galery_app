import Album from "@/components/Album";
import DisplayImages from "@/components/DisplayImages";
import Navbar from "@/components/Navbar"
import { BiPhotoAlbum } from "react-icons/bi";
import { SlCompass } from "react-icons/sl";

export default function Page() {

  return (
    <div>
        <section>
          <span className="flex items-center gap-3 text-2xl mb-5 mt-10">
            <BiPhotoAlbum />
            Albumy
          </span>

          <div className="grid grid-cols-3 gap-3">
            <Album />
            <Album />
            <Album />
          </div>

        </section>
        <section>
          <span className="flex items-center gap-3 text-2xl mb-5 mt-10">
            <SlCompass />
            Odkrywaj
          </span>
          <DisplayImages />
        </section>
      </div>
  );
}