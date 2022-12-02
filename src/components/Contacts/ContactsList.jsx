import { Box } from 'components/Box';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from "redux/contacts/operations";
import { getContacts, getFilter } from 'redux/contacts/selectors';
import { ContactItem, ContactButton, ContactDescription } from './ContactsList.styled';

export const ContactsList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);

    const contactDelete = (contactId) => {
        dispatch(deleteContact(contactId))
    };

    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLocaleLowerCase();
    //console.log('normalizedFilter',normalizedFilter);
        return contacts.filter(contact => (contact.name.toLocaleLowerCase().includes(normalizedFilter)))
    };

    const visibleContacts = getVisibleContacts();
    
    return (
        <Box as="ul" p={4} border="normal" borderColor="accent" borderRadius="normal">
            {visibleContacts.map((contact) => 
                 <ContactItem key={contact.id}>
                        <ContactDescription>{contact.name}:</ContactDescription>
                        <ContactDescription>{contact.number}</ContactDescription>
                        <ContactButton type="button" onClick={() => contactDelete(contact.id)}>Delete</ContactButton>
                    </ContactItem>
            )}
        </Box>
    )
};

ContactsList.prototype = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};