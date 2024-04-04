import React, { useState } from 'react';
import { Warehouse } from '../interfaces/Warehouse';
import { Item } from '../interfaces/Item';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import StatusDisplay from './StatusDisplay';

interface DialogProps {
  onClose: () => void;
}

interface WarehouseDialogProps extends DialogProps {
  warehouse?: Warehouse;
}

interface ItemDialogProps extends DialogProps {
  item?: Item;
  warehouse?: Warehouse;
}

const API_BASE_URL = 'http://localhost:8080/api';

const submitForm = async (url: string, method: string, formData: any, onClose: () => void) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Failed to ${method === 'DELETE' ? 'delete' : 'edit'} ${url}`);
    }
    // Assuming success, close the dialog
    onClose();
  } catch (error) {
    console.error(`Error ${method === 'DELETE' ? 'deleting' : 'editing'} ${url}:`, error);
  }
};

export const AddWarehouseDialog: React.FC<DialogProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', location: '', capacity: 1 });
  const [response, setResponse] = useState<Response | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await submitForm(`${API_BASE_URL}/warehouse`, 'POST', formData, onClose);
  // };

    //Customized handleSubmit to return a response. I should have designed this system better. 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        let response = await fetch(`${API_BASE_URL}/warehouse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setResponse(response);
        if (!response.ok) {
          throw new Error(`Failed to add new warehouse`);
        }
  
        onClose();
      } catch (error) {
        console.error('Error adding warehouse:', error);
      }
    };
  

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Add New Warehouse</h2>
        <StatusDisplay response={response} />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location:</Label>
            <Input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="capacity">Capacity:</Label>
            <Input type="text" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const EditWarehouseDialog: React.FC<WarehouseDialogProps> = ({ onClose, warehouse }) => {
  const [formData, setFormData] = useState({ name: warehouse?.name || '', location: warehouse?.location || '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(`${API_BASE_URL}/${warehouse?.name}`, 'PUT', formData, onClose);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Edit Warehouse {warehouse?.name}</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location:</Label>
            <Input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const RemoveWarehouseDialog: React.FC<WarehouseDialogProps> = ({ onClose, warehouse }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(`${API_BASE_URL}/${warehouse?.name}`, 'DELETE', {}, onClose);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>DELETE Warehouse {warehouse?.name}</h2>
        <Form onSubmit={handleSubmit}>
          <div><p>Are you sure you want to delete?</p></div>
          <Button type="submit">CONFIRM DELETE</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const AddItemDialog: React.FC<ItemDialogProps> = ({ onClose, warehouse }) => {
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 1 });
  const [response, setResponse] = useState<Response | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Customized handleSubmit to return a response. I should have designed this system better. 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/items/${warehouse?.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setResponse(response);

      if (!response.ok) {
        throw new Error(`Failed to add item to warehouse ${warehouse?.name}`);
      }

      onClose();
    } catch (error) {
      console.error('Error adding warehouse:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Add New Item to {warehouse?.name}</h2>
        <StatusDisplay response={response} />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="quantity">Quantity:</Label>
            <Input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const RemoveItemDialog: React.FC<ItemDialogProps> = ({ onClose, item, warehouse }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(`${API_BASE_URL}/${warehouse?.name}/${item?.name}`, 'DELETE', {}, onClose);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>DELETE Warehouse {warehouse?.name}</h2>
        <Form onSubmit={handleSubmit}>
          <div><p>Are you sure you want to delete?</p></div>
          <Button type="submit">CONFIRM DELETE</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const EditItemDialog: React.FC<ItemDialogProps> = ({ onClose, item, warehouse }) => {
  const [formData, setFormData] = useState({ name: item?.name || '', description: item?.description || '', quantity: item?.quantity || 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(`${API_BASE_URL}/items/${warehouse?.name}/${item?.name}`, 'PUT', formData, onClose);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Edit Item in {warehouse?.name}</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="quantity">Quantity:</Label>
            <Input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const EditItemDialogNoQuantity: React.FC<ItemDialogProps> = ({ onClose, item }) => {
  const [formData, setFormData] = useState({ name: item?.name || '', description: item?.description || '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(`${API_BASE_URL}/itemlist/${item?.name}`, 'PUT', formData, onClose);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Edit Item {item?.name}</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};

export const RemoveItemDialogGlobal: React.FC<ItemDialogProps> = ({ onClose, item }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(`${API_BASE_URL}/itemlist/${item?.name}`, 'DELETE', {}, onClose);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>DELETE item {item?.name} from all warehouses?</h2>
        <Form onSubmit={handleSubmit}>
          <div><p>Are you sure you want to delete?</p></div>
          <Button type="submit">CONFIRM DELETE</Button>
          <Button type="button" onClick={onClose}>Close</Button>
        </Form>
      </div>
    </div>
  );
};
