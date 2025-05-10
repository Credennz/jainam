import React from 'react';

interface FooterProps {
  version: string;
  companyName: string;
  copyrightYear: string;
}

const Footer: React.FC<FooterProps> = ({ version, companyName, copyrightYear }) => {
  return (
    <footer className="bg-gray-100 py-2 px-4 border-t text-xs text-gray-600">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-[#2D0A42] rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="font-medium">eWebOffice</div>
            <div>Ver {version}</div>
          </div>
        </div>
        
        <div className="mt-1 md:mt-0">
          <div>Copyright © {copyrightYear}</div>
          <div>Jainam Broking Private Limited</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;