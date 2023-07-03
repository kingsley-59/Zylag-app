import CardTitle from '@/app/components/CardTitle'
import FormContainer from '@/app/components/FormContainer'
import SaveButton from '@/app/components/SaveButton'
import { FormEvent, useState } from 'react'



export default function ChangePassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [inputError, setInputError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) return setInputError('Password does not match');
    }

    return (
        <div>
            <CardTitle isSaved={true} title="Change password" />
            <form className="w-full p-5 md:py-8" onSubmit={handleSubmit}>
                <FormContainer>
                    <div className="form-group">
                        <label className="font-semibold">New password</label>
                        <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" required />
                    </div>
                    <div className="form-group">
                        <label className="font-semibold">Confirm password</label>
                        <input type="password" className="form-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="confirm password" required />
                    </div>
                    <div className="form-group ">
                        {inputError && <span className="text-xs text-red-700"></span>}
                        <SaveButton />
                    </div>
                </FormContainer>
            </form>
        </div>
    )
}
