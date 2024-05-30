import React, { useState, useEffect } from 'react';
import AccountForm from './AccountForm';
import AccountList from './AccountList';
import { fetchAccounts, updateAccount, createAccount, deleteAccount } from '../../api/api';

function AccountManagement() {
    const [account, setAccount] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        refreshAccounts();
    }, []);

    const refreshAccounts = () => {
        fetchAccounts().then(setAccount);
    };

    const handleAccountSubmit = async (account) => {
        if (account.id) {
            await updateAccount(account.id, account);
        } else {
            await createAccount(account);
        }
        refreshAccounts();
        setSelectedAccount(null); // Reset selection
    };

    const handleDeleteAccount = async (accountId) => {
        try {
            await deleteAccount(accountId);
            setAccount(prev => prev.filter(acc => acc.id !== accountId));
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleCancel = () => {
        setSelectedAccount(null);  // Clear the current selection
    };

    const handleSelectAccount = (account) => {
        setSelectedAccount(account);
    };

    return (
        <div>
            <AccountForm 
                account={selectedAccount}
                onSubmit={handleAccountSubmit}
                onCancel={handleCancel}
            />
            <AccountList 
                accounts={account}
                onSelectAccount={handleSelectAccount} 
                onDeleteAccount={handleDeleteAccount}
            />
        </div>
    );
}

export default AccountManagement;
