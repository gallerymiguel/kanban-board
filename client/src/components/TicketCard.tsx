import { Link } from 'react-router-dom';

import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  // Delete ticket
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {  // MouseEventHandler<HTMLButtonElement> is a type for event handlers
    const ticketId = Number(event.currentTarget.value);  // event.currentTarget.value is a string
    if (!isNaN(ticketId)) {  // isNaN() is a function that checks if a value is NaN (Not a Number)
      try {
        const data = await deleteTicket(ticketId);  // deleteTicket() is a function that deletes a ticket
        return data;  // Return the data
      } catch (error) {  
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link to='/edit' state={{id: ticket.id}} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
