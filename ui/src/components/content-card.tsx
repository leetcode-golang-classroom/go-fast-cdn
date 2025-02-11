import { DownloadCloud, FileText, Files } from "lucide-react";
import { toast } from "react-hot-toast";

type TContentCardProps = {
  file_name?: string;
  type?: "images" | "documents";
  ID?: number;
  createdAt?: Date;
  updatedAt?: Date;
  disabled?: boolean;
};

const ContentCard: React.FC<TContentCardProps> = ({
  file_name,
  type = "documents",
  disabled = false,
  // ID,
  // createdAt,
  // updatedAt,
}) => {
  const url = `${window.location.protocol}//${
    window.location.host
  }/api/cdn/download/${type === "documents" ? "docs" : "images"}/${file_name}`;

  return (
    <div className="border rounded-lg shadow-lg flex flex-col min-h-[264px] w-64 max-w-[256px] justify-center items-center gap-4 p-4">
      {type === "images" ? (
        <img
          src={url}
          alt={file_name}
          width={224}
          height={150}
          className="object-cover max-h-[150px] max-w-[224px]"
        />
      ) : (
        <FileText size="128" />
      )}
      <p className="truncate w-64 px-4">{file_name}</p>
      <div className={`flex gap-2 w-full ${disabled && "sr-only"}`}>
        <button
          className="flex justify-center items-center text-sky-600 tooltip"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast.success("clipboard saved");
          }}
          aria-label="Copy Link"
          aria-labelledby="Copy Link"
        >
          <span className="tooltiptext">Copy Link</span>
          <Files className="inline" size="24" />
        </button>
        <a
          className="flex justify-center items-center text-sky-600 tooltip"
          aria-label="Download file"
          aria-labelledby="Download file"
          href={url}
          download
        >
          <span className="tooltiptext">Download file</span>
          <DownloadCloud className="inline" size="24" />
        </a>
      </div>
    </div>
  );
};

export default ContentCard;
