import CardTitle from '@/app/components/CardTitle'
import FormContainer from '@/app/components/FormContainer'
import SaveButton from '@/app/components/SaveButton'



const formWidth = '400px';

export default function DeleteAccount() {
    return (
        <div>
            <CardTitle isSaved={true} title="Delete account" />
            <form className="w-full p-5 md:py-8">
                <FormContainer>
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
                </FormContainer>
            </form>
        </div>
    )
}
