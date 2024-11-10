import Album from "@/components/Album";
import DisplayImages from "@/components/DisplayImages";
import Navbar from "@/components/Navbar"
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { MdExplore } from "react-icons/md";

export default function Page() {

  return (
    <div>
      <Navbar />
        <section>
          <span className="flex items-center gap-1 text-2xl mb-3">
            <BiSolidPhotoAlbum />
            Albumy
          </span>

          <div className="grid grid-cols-3 gap-3">
            <Album />
            <Album />
            <Album />
          </div>

        </section>
        <section>
          <span className="flex items-center gap-1 text-2xl my-3">
            <MdExplore />
            Odkrywaj
          </span>
          <DisplayImages />
        </section>
      </div>
  );
}