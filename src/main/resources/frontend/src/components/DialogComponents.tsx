import React, { useState } from 'react';
import { Warehouse } from '../interfaces/Warehouse';
import { Item } from '../interfaces/Item';

interface AddProps {
  onClose: () => void;
}


interface EditProps {
  onClose: () => void;
  warehouse: Warehouse;
}

interface ItemProps {
  onClose: () => void;
  item: Item;
  warehouse: Warehouse;
}

interface SimpleItemListProps {
  onClose: () => void;
  item: Item;
}
export const AddWarehouseDialog: React.FC<AddProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', location: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/warehouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add warehouse');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error adding warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Add New Warehouse</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};


export const EditWarehouseDialog: React.FC<EditProps> = ({ onClose, warehouse}) => {
  const [formData, setFormData] = useState({ name: '', location: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/${warehouse.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit warehouse');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error editing warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Edit Warehouse {warehouse.name}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};


export const RemoveWarehouseDialog: React.FC<EditProps> = ({ onClose, warehouse}) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/${warehouse.name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit warehouse');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error editing warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>DELETE Warehouse {warehouse.name}</h2>
        <form onSubmit={handleSubmit}>
          <div><p>are you sure you want to delete?</p></div>
          <button type="submit">CONFIRM DELETE</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};


export const AddItemDialog: React.FC<EditProps> = ({onClose, warehouse}) => {
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/items/${warehouse.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to add item to warehouse ${warehouse.name}`);
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error adding warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Add New Item to </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>        
          <div>
            <label htmlFor="quantity">quantity:</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export const RemoveItemDialog: React.FC<ItemProps> = ({ onClose, item, warehouse}) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/${warehouse.name}/${item.name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit warehouse');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error editing warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>DELETE Warehouse {warehouse.name}</h2>
        <form onSubmit={handleSubmit}>
          <div><p>are you sure you want to delete?</p></div>
          <button type="submit">CONFIRM DELETE</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export const EditItemDialog: React.FC<ItemProps> = ({ onClose, item, warehouse}) => {
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/items/${warehouse.name}/${item.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit item');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Edit Item in {warehouse.name}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};


export const EditItemDialogNoQuantity: React.FC<SimpleItemListProps> = ({ onClose, item}) => {
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/itemlist/${item.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit item');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Edit Item {item.name}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};


export const RemoveItemDialogGlobal: React.FC<SimpleItemListProps> = ({ onClose, item}) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/itemlist/${item.name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit warehouse');
      }
      // Assuming success, close the dialog
      onClose();
    } catch (error) {
      console.error('Error editing warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>DELETE item {item.name} from all warehouses?</h2>
        <form onSubmit={handleSubmit}>
          <div><p>are you sure you want to delete?</p></div>
          <button type="submit">CONFIRM DELETE</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};