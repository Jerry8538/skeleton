import React from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        
                            <Home />
                        
                    </Link >
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;