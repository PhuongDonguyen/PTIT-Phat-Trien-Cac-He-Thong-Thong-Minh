import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ breadcrumbs }) => {
    return (
        <nav
            style={{
                '--bs-breadcrumb-divider': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
            }}
            aria-label="breadcrumb"
            className='my-4'
        >
            <ol className="breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''
                            }`}
                        aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                    >
                        {index === breadcrumbs.length - 1 ? (
                            crumb.label
                        ) : (
                            <Link className='text-decoration-none' to={crumb.path}>{crumb.label}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default BreadCrumb;
