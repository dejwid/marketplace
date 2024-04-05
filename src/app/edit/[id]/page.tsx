'use server';

import AdForm from "@/components/AdForm";
import {authOptions} from "@/libs/authOptions";
import {connect} from "@/libs/helpers";
import {AdModel} from "@/models/Ad";
import {getServerSession} from "next-auth";

type Props = {
  params: {
    id: string;
  };
  searchParams: {[key: string] : string};
};

export default async function EditPage(props:Props) {
  const id = props.params.id;
  await connect();
  const session = await getServerSession(authOptions);

  const adDoc = await AdModel.findById(id);
  if (!adDoc) {
    return '404 not found';
  }
  if (session?.user?.email !== adDoc?.userEmail) {
    return 'not yours';
  }

  return (
    <AdForm
      id={adDoc._id}
      defaultTexts={adDoc}
      defaultFiles={adDoc.files}
      defaultLocation={{lng:adDoc.location.coordinates[0],lat:adDoc.location.coordinates[1]}} />
  );
}