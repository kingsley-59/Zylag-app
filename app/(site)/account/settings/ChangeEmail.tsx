import CardTitle from '@/app/components/CardTitle'
import FormContainer from '@/app/components/FormContainer'
import SaveButton from '@/app/components/SaveButton'
import { useAppSelector } from '@/app/redux/hooks'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'



export default function ChangeEmail() {
    const { email: authEmail } = useAppSelector(state => state.auth)
    const [saved, setSaved] = useState(false);
    const [email, setEmail] = useState(authEmail);

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setSaved(e.target.value === authEmail)
        setEmail(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setSaved(true);
    }

    return (
        <div>
            <CardTitle isSaved={saved} title="Change email" />
            <form className="w-full p-5 md:py-8" onSubmit={handleSubmit}>
                <FormContainer >
                    <div className="form-group">
                        <label className="font-semibold">Your Email</label>
                        <input type="email" className="form-input" value={email} onChange={onChangeEmail} placeholder="Your email" required />
                    </div>
                    <div className="form-group ">
                        <SaveButton />
                    </div>
                </FormContainer>
            </form>
        </div>
    )
}
