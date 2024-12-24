import { DeleteLater } from "@/components/client/deleteLater";
import { generateSignedURL } from "@/server-actions/s3-server-action";

export default function DeleteLaterPage() {
  return (
    <>
      <DeleteLater generateSignedURL={generateSignedURL} />
    </>
  );
}
