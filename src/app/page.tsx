"use client";

import { SignInFormPasswordAndVerifyViaCode } from "@/components/forms/auth/signinWithCodeAndPassword";
import {
  Authenticated,
  Unauthenticated,
  useQuery,
  useAction,
  useMutation,
  usePaginatedQuery,
} from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "@/components/buttons/BaseButton";
import { Id } from "../../convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { FormEvent, useState } from "react";


export default function Home() {
  const user = useQuery(api.user.getUser);
  const initializeTransaction = useAction(api.payments.initializePaystackTransaction);
  const addGroup = useAction(api.actions.addGroupAction);
  const {signOut} = useAuthActions();
  const generateUploadUrl = useMutation(api.user.generateUserProfileUploadUrl);
  const saveImage = useMutation(api.user.saveUserProfileImage);
  const [image, setImage] = useState<File | null>(null);

  const createGroup = async () => {
    await addGroup({
      creator_id: user?._id as Id<"users">,
      name: "Adeyemi Adejumo",
      number_of_people: 5,
      interval: "monthly",
      savings_per_interval: 10000,
      private: false,
      description: "test group"
    })
  };
  
  const payMoney = async () => {
    const res = await initializeTransaction({
      amount: 10000,
      email: user?.email as string,
      metadata: {
        userId: user?._id as Id<"users">,
        details: "pay group",
      }
    });
    if (res) {
      window.location.href = res.data.authorization_url;
    }
  };

  const handleProfileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = await generateUploadUrl();
    const result = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": image!?.type,},
      body: image
    })
    const {storageId} = await result.json();
    console.log(result.json());
    console.info("Storage id")
    console.log(storageId)
    await saveImage({imageId: storageId as Id<"_storage">});
    console.log(image);
  }
  // try{
  const {results, status, loadMore} = usePaginatedQuery(api.user.getMyGroups, {}, {initialNumItems: 4});
  //   if (results) setGroups(results);
  // } catch(error: any) {
  //   console.error(error.data)
  // }
  
  return (
    <main className="d-flex mh-100 mt-10 flex-column align-items-center justify-content-between p-24">
      <Unauthenticated>
        <SignInFormPasswordAndVerifyViaCode />
        
      </Unauthenticated>
      <Authenticated>
        <div className="card w-72 h-20">
          <div>{user?.first_name ?? user?.email ?? user?.phone ?? "Anonymous"}</div>
        </div>
        <div>
          <h2>Pay money</h2>
          <Button onClick={payMoney}>Pay money</Button>
        </div>
        <div>
          <h2>Create group</h2>
          <Button onClick={createGroup}>Create a group</Button>
        </div>
        <div>
          <form action="" onSubmit={e => handleProfileUpload(e)}>
            <label>Add Profile Image</label>
            <input type="file" className="form-control" name="image" id="image" onChange={e => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setImage(files[0]);
              }
            }}/>
            <Button type="submit">Upload file</Button>
          </form>
          
          

        </div>
        <div>
          <h2>My groups</h2>
            {
              results.map((v, i) => (
                <div key={i} className="d-flex flex-column gap-2">
                  <p className="b-2">{v.name}</p>
                  <p className="b-2">People Expected {"=>"} {v.numOfMembers}</p>
                  <p className="b-2">People joined {"=>"} {v.numJoined}</p>
                </div>
              ))
            }
            {/* <Button typ></Button> */}
        </div>
        <span className="btn-danger" onClick={signOut}>Logout</span>
      </Authenticated>
    </main>
  );
}
