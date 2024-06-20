import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t-1 border-white shadow-gray-500 shadow text-gray-200 pt-10 pb-5">
            <div className="container mx-auto px-4 md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">ChessPro</h3>
                    <p className="text-gray-400">Play and enjoy the game of chess.</p>
                </div>
                <div className="grid grid-cols-2 gap-8 md:flex md:space-x-10">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Company</h4>
                        <ul>
                            <li>
                                <Link href="/About">
                                    <p className="hover:text-white">About Us</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers">
                                    <p className="hover:text-white">Careers</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <p className="hover:text-white">Contact</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Support</h4>
                        <ul>
                            <li>
                                <Link href="/help">
                                    <p className="hover:text-white">Help Center</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy">
                                    <p className="hover:text-white">Privacy Policy</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms">
                                    <p className="hover:text-white">Terms of Service</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className=" text-center text-gray-500 mt-6">
                &copy; {new Date().getFullYear()} ChessPro. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;