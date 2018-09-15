import React from 'react';

const Footer = () => {
    return (
        <div style={{ marginTop: '15%', bottom: 0 }}>
            <div className="row">
                <legend></legend>
                <div className="col-sm-6">
                    <p>© Copyright 2018 - 2019. PGRMRM. All Rights Reserved.</p>
                </div>
                <div className="col-sm-2 col-sm-offset-4">
                    <p>
                        <span><a href="#">Privacy</a> | <a href="#">Contact</a></span>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Footer;
