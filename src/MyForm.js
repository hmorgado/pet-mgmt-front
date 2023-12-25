import React from 'react';
import { Formik, Field, Form } from 'formik';

function MyForm(){

    async function addKitty(values){
        fetch(
            `http://localhost:8080/rest/pets`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": values.catName,
                    "petType": {
                        "id": 2,
                    }
                })
            }
        )
    }

    return(
        <div>
            <h1>Add kitty</h1>
            <Formik
                initialValues={{
                    catName: '',
                    type: 2,
                }}
            onSubmit={(values) => addKitty(values)}
            >
            <Form>
                <label htmlFor="catName">Cat Name   </label>
                <Field id="catName" name="catName"></Field>
                <button type="submit">Submit</button>
            </Form>
            </Formik>
        </div>
    )
}

export default MyForm;