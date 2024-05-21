import styled from "styled-components";

import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    width: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`

export const FormContainer = styled.form`
    height: 100px;
    min-width: 860px;
`

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`