import { S3 } from "@/components/client/global/s3";
import { generateSignedURL } from "@/server-actions/s3-server-action";

export default function DeleteLaterPage() {
  return (
    <>
      <S3 generateSignedURL={generateSignedURL} />
    </>
  );
}
