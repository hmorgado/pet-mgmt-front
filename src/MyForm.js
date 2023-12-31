import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { object, string, number, date, InferType } from 'yup';
import ReusableMessage from './ReusableMessage';


const ReusableMessageOld = ({ text = "nothing passed", statusFunc, status }) => {
    if (status) {
        return (
            <div>
                <button onClick={() => statusFunc(null)}> {text} (X)</button>
            </div >
        )
    }
}


const petSchema = object({
    petName: string().required('please name your pet'),
});

function getPetTypesAxios() {
    // figure this out
    return axios.get('http://localhost:8080/rest/petTypes')
}

function getPetTypes() {
    console.log('called getPetTypes()')
    return fetch(
        `http://localhost:8080/rest/petTypes`
    ).then((response) => response.json())
}

function MyForm(props) {
    const [submitResult, setSubmitResult] = useState(null);

    async function addPet(values) {
        axios.post('http://localhost:8080/rest/pets', {
            "name": values.petName,
            "petType": {
                "id": values.petTypeId,
            }
        })
            .then((r) => {
                setSubmitResult(true)
                props.onFormSubmit();
            })
            .catch((r) => {
                console.log("error ...")
                console.log(r)
                setSubmitResult(false)
            })
    }

    const [petTypes, setPetTypes] = useState(null)

    useEffect(() => {
        getPetTypes().then(setPetTypes)
    }, [])

    console.log('pet types - ', petTypes)

    return (
        <div>
            <h1>Add Pet</h1>
            <Formik
                initialValues={{
                    petName: '',
                    type: 2,
                }}
                validationSchema={petSchema}
                onSubmit={(values) => addPet(values)}
            >
                {({ errors, touched }) => (<Form>
                    <label htmlFor="petName">Pet Name   </label>
                    <Field id="petName" name="petName"></Field>
                    {errors.petName && touched.petName && <div>{errors.petName}</div>}
                    <br />
                    <label htmlFor="petName">
                        Pet Type
                        {
                            petTypes ?
                                petTypes.map((p) => (
                                    <label key={p.id}>
                                        <Field type="radio" name="petTypeId" value={p.id.toString()} />
                                        {p.name}
                                    </label>
                                )) : <p>no pet types atm</p>
                        }
                        <br />
                        <button type="submit">Submit</button>
                        <br />
                        <br />
                    </label> <br />
                </Form>)}
            </Formik>
            {
                (submitResult == null) ? <p /> :
                    (submitResult) ?
                        <ReusableMessage text="Add worked!" statusFunc={setSubmitResult} status={true} />
                        :
                        <ReusableMessage text="Oops! Something went wrong" statusFunc={setSubmitResult} status={true} />
            }
        </div>

    )
}
export default MyForm;