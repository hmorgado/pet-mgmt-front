import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { object, string, number, date, InferType } from 'yup';

const petSchema = object({
    petName: string().required('please name your pet'),
});
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
                console.log(r.status)
                setSubmitResult(true)
                props.onFormSubmit();
            })
            .catch((r) => {
                console.log("error ...")
                console.log(r)
                setSubmitResult(false)
            })
    }

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
                {({errors, touched}) => (<Form>
                    <label htmlFor="petName">Pet Name   </label>
                    <Field id="petName" name="petName"></Field>
                    {errors.petName && touched.petName && <div>{errors.petName}</div>}
                    <br />
                    <label htmlFor="petName">
                        Pet Type
                        <label>
                            <Field type="radio" name="petTypeId" value="1" />
                            Bird
                        </label>
                        <label>
                            <Field type="radio" name="petTypeId" value="2" />
                            Cat
                        </label>
                        <label>
                            <Field type="radio" name="petTypeId" value="3" />
                            Dog
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                        <br />
                        <br />
                    </label> <br />
                </Form>)}

            </Formik>
            msg here:
            {
                (submitResult == null) ? <p /> :
                    (submitResult) ? <p>
                        added ok
                        <button onClick={() => setSubmitResult(null)}>close</button>
                    </p> :
                        <p>
                            something happened
                            <button onClick={() => setSubmitResult(null)}>close</button>
                        </p>
            }
        </div>

    )
}
export default MyForm;