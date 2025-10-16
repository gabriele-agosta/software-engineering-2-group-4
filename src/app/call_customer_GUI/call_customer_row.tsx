import { Mesg } from "./call_customer_GUI";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Call_Customer_Row(prop:Mesg) {


    return (
        <tr className="row text-center">
            <td className="col-4">
                {`${prop.counterId}`}
            </td>
            <td className="col-4">
                {`${prop.ticket.ticket!.serviceId}`}
            </td>
            <td className="col-4">
                {`${prop.ticket.ticket!.id}`}
            </td>
        </tr>
    );
}