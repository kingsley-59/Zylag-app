'use client';
import PencilIcon from "@/app/icons/PencilIcon";
import { useState } from "react";



function CardTitle({ title, isSaved }: { title: string, isSaved: boolean }) {
  return (
    <>
      <div className="w-full rounded-t-xl px-3 py-4 between">
        <div>{title}</div>
        <div className="rounded-xl px-3 py-1 bg-red-100 text-red-600">{isSaved ? 'Saved' : 'Save'}</div>
      </div>
      <hr className="border-t border-dashed border-[#ececec]" />
    </>
  )
}

function SaveButton({text, onClick}: {text?: string, onClick?: () => void}) {
  return (
    <button type="submit" className="w-full text-white bg-red-700 py-4 rounded-md">{text || 'Save'}</button>
  )
}

function FormContainer({children}: {children: any}) {
  return (
    <div className="max-w-[400px] col-center gap-5 lg:gap-7 mx-auto">
      {children}
    </div>
  )
}


export default function page() {
  const formWidth = '400px';

  // States
  const [personalDetailsChanged, setPersonalDetailsChanged] = useState(false);
  const [companyNameChanged, setCompanyNameChanged] = useState(false);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="min-h-[400px] rounded-xl shadow">
          <CardTitle isSaved={personalDetailsChanged} title="Personal Details" />
          <div className="w-full p-5 md:py-8">
            <form className="w-full">
              <FormContainer >
                {/* Personal details form start */}
                <div className="relative rounded-full object-center w-[100px] aspect-square bg-slate-400 mb-5">
                  <img className="object-top object-cover rounded-full" src="/headshot.jpg" alt="profile picture" />
                  <div className="absolute center right-1 -bottom-1 p-3 rounded-full bg-red-100"><PencilIcon /></div>
                </div>
                <div className="form-group">
                  <label className="font-semibold">First Name</label>
                  <input type="text" className="form-input" placeholder="First Name" required />
                </div>
                <div className="form-group">
                  <label className="font-semibold">Last Name</label>
                  <input type="text" className="form-input" placeholder="Last Name" required />
                </div>
                <div className="form-group">
                  <label className="font-semibold">Select Location</label>
                  <input type="text" className="form-input" placeholder="Select Location" required />
                </div>
                <div className="form-group">
                  <label className="font-semibold">Birthday</label>
                  <input type="date" className="form-input" placeholder="Select Birthday" required />
                </div>
                <div className="form-group">
                  <label className="font-semibold">Sex</label>
                  <select name="" className="form-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="masquerade">Masquerade</option>
                  </select>
                </div>
                <div className="form-group py-10 lg:py-7">
                  <SaveButton />
                </div>
                {/* Form end */}
              </FormContainer>
            </form>
          </div>
        </div>

        <div className="min-h-[400px] grid grid-flow-row gap-3">
          <div className="min-h-[200px] shadow rounded-xl ">
            <CardTitle isSaved={true} title="Company name and description" />
            <form className="w-full p-5 md:py-8">
              <FormContainer >
                <div className="form-group">
                  <label className="font-semibold">Company name</label>
                  <input type="text" className="form-input" placeholder="Commpany name" required />
                </div>
                <div className="form-group">
                  <label className="font-semibold">About Company</label>
                  <input type="text" className="form-input" placeholder="About company" required />
                </div>
                <div className="form-group ">
                  <SaveButton />
                </div>
              </FormContainer>
            </form>
          </div>

          <div className="min-h-[120px] shadow rounded-xl ">
            <CardTitle isSaved={true} title="Change email" />
            <form className="w-full p-5 md:py-8">
              <FormContainer >
                <div className="form-group">
                  <label className="font-semibold">Your Email</label>
                  <input type="email" className="form-input" placeholder="Your email" required />
                </div>
                <div className="form-group ">
                  <SaveButton />
                </div>
              </FormContainer>
            </form>
          </div>

          <div className="min-h-[120px] shadow rounded-xl ">
            <CardTitle isSaved={true} title="Change phone number" />
            <form className="w-full p-5 md:py-8">
              <FormContainer>
                <div className="form-group">
                  <label className="font-semibold">Change phone number</label>
                  <input type="text" className="form-input" placeholder="phone number" required />
                </div>
                <div className="form-group ">
                  <SaveButton />
                </div>
              </FormContainer>
            </form>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="min-h-[120px] shadow rounded-xl ">
          <CardTitle isSaved={true} title="Change password" />
          <form className="w-full p-5 md:py-8">
            <FormContainer>
              <div className="form-group">
                <label className="font-semibold">New password</label>
                <input type="password" className="form-input" placeholder="New password" required />
              </div>
              <div className="form-group">
                <label className="font-semibold">Confirm password</label>
                <input type="password" className="form-input" placeholder="confirm password" required />
              </div>
              <div className="form-group ">
                <SaveButton />
              </div>
            </FormContainer>
          </form>
        </div>

        <div className="min-h-[120px] shadow rounded-xl ">
          <CardTitle isSaved={true} title="Delete account" />
          <form className="w-full p-5 md:py-8">
            <div className={`max-w-[${formWidth}] col-center gap-5 lg:gap-7 mx-auto`}>
              <div className="form-group">
                <p>
                  You will lose access to your profile and all account history will be permanently erased, making restoration impossible
                </p>
              </div>
              <div className="form-group">
                <label className="font-semibold">Change phone number</label>
                <input type="text" className="form-input" placeholder="phone number" required />
              </div>
              <div className="form-group ">
                <SaveButton />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
