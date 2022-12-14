import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')


	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/token/`, reqBody)

			// save the token in localstorage
			const token = response.data.access
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser({userId: decoded.user_id})

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to={`/users/${currentUser.userId}`} />
	}

	return (
		<div>
			<section className="h-screen">
				<div className="px-20 h-full text-gray-800">
					<div
						className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
					>
					<div
						className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
					>
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="w-half"
							alt="Sample image"
						/>
					</div>

					<div className="xl:ml-20 xl:w-5/12 mx:5 lg:w-5/12 md:w-8/12 mb-5 md:mb-0">
						<form onSubmit={handleSubmit}>
							{/* <!-- Email input --> */}
							<div className="mb-6">
								<input
									type="text"
									className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlInput2"
									placeholder="Email address"
									onChange={e => setEmail(e.target.value)}
									value={email}
									required
								/>
							</div>
							{/* <!-- Password input --> */}
							<div className="mb-6">
								<input
									type="password"
									className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlInput2"
									placeholder="Password"
									onChange={e => setPassword(e.target.value)}
									value={password}
									required
								/>
							</div>
							<div className="text-center lg:text-left">
								<button
									type="submit"
									className="inline-block px-7 py-3 bg-[#5094d4] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#b7d8f1] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									>
									Login
								</button>
								<p className="text-sm font-semibold mt-2 pt-1 mb-0">
								Don't have an account?  {  }
								<Link 
									to="/register"
									className="font-medium text-red-500 text-primary-600 hover:underline dark:text-primary-500 px-1"
									>Register
								</Link>

								</p>
							</div>
						</form>
					</div>
					</div>
				</div>
			</section>
			
			<p>{msg}</p>
		</div>
	)
}