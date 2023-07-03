'use client';
import CardTitle from '@/app/components/CardTitle'
import FormContainer from '@/app/components/FormContainer'
import SaveButton from '@/app/components/SaveButton'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';


export default function CompanyDetails() {
    const [savedCompanyName, setSavedCompanyName] = useState('')
    const [savedCompanyAbout, setSavedCompanyAbout] = useState('')

    const [saved, setSaved] = useState(false);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyAbout, setCompanyAbout] = useState<string>('');

    const onCompanyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSaved(e.target.value === savedCompanyName)
        setCompanyName(e.target.value)
    }

    const onCompanyAboutChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSaved(e.target.value === savedCompanyAbout)
        setCompanyAbout(e.target.value)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setSaved(true);
    }

    useEffect(() => {
        setCompanyName('Venpay');
        setSavedCompanyName('Venpay'); 
        setCompanyAbout('');
        setSavedCompanyAbout('Venpay');
    }, [])

    return (
        <div>
            <CardTitle isSaved={saved} title="Company name and description" />
            <form className="w-full p-5 md:py-8" onSubmit={handleSubmit}>
                <FormContainer >
                    <div className="form-group">
                        <label className="font-semibold">Company name</label>
                        <input type="text" className="form-input" value={companyName} onChange={onCompanyNameChange} placeholder="Commpany name" required />
                    </div>
                    <div className="form-group">
                        <label className="font-semibold">About Company</label>
                        <input type="text" className="form-input" value={companyAbout} onChange={onCompanyAboutChange} placeholder="About company" required />
                    </div>
                    <div className="form-group ">
                        <SaveButton />
                    </div>
                </FormContainer>
            </form>
        </div>
    )
}
