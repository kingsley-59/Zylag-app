import CardTitle from '@/app/components/CardTitle'
import FormContainer from '@/app/components/FormContainer'
import SaveButton from '@/app/components/SaveButton'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';



export default function ChangePhone() {
    const [saved, setSaved] = useState(false);
    const [prevPhone, setPrevPhone] = useState('');
    const [phone, setPhone] = useState('');

    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setSaved(e.target.value === prevPhone)
        setPhone(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setSaved(true);
    }

    useEffect(() => {
        setPrevPhone('080123456789');
    }, [])

    return (
        <div>
            <CardTitle isSaved={saved} title="Change phone number" />
            <form className="w-full p-5 md:py-8" onSubmit={handleSubmit}>
                <FormContainer>
                    <div className="form-group">
                        <label className="font-semibold">Change phone number</label>
                        <input type="text" className="form-input" value={phone} onChange={onChangePhone} placeholder="phone number" required />
                    </div>
                    <div className="form-group ">
                        <SaveButton />
                    </div>
                </FormContainer>
            </form>
        </div>
    )
}
