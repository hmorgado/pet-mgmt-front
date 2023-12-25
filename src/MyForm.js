import React from 'react';
import { Formik, Field, Form } from 'formik';

function MyForm() {

    async function addPet(values) {
        fetch(
            `http://localhost:8080/rest/pets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": values.petName,
                "petType": {
                    "id": values.petTypeId,
                }
            })
        }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
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
                onSubmit={(values) => addPet(values)}
            >
                <Form>
                    <label htmlFor="petName">Pet Name   </label>
                    <Field id="petName" name="petName"></Field>
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
                    </label>  <br />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default MyForm;