import {useForm} from 'react-hook-form'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm();

    const submitForm = (data) => {
        console.log(data);
    }

    return (<div onSubmit={handleSubmit(submitForm)}>
        <form>
            <input 
            placeholder="Email"
            { ...register("email",{
                required: "This field is required"
            })}
            />
            <input 
            placeholder="Password"
            {...register('password',{
                required: "This field is required",
            })}
            />

            <button type="submit">Login</button>
        </form>
    </div>)
}

export default LoginForm;