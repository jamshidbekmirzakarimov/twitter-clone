import React from 'react';
import { Flame, Users } from 'lucide-react';

const SidebarRight = () => {
    return (
        <div className="sidebar-right">
            <div className="widget-card card">
                <div className="widget-header">
                    <div className="icon-bg" style={{ color: '#eab308' }}>
                        <Flame size={18} />
                    </div>
                    Trends
                </div>
                
                <div className="trend-item">
                    <div className="trend-name">#hackathon</div>
                    <div className="trend-stats">18.4K posts</div>
                </div>
                <div className="trend-item">
                    <div className="trend-name">#buildinpublic</div>
                    <div className="trend-stats">9.7K posts</div>
                </div>
                <div className="trend-item">
                    <div className="trend-name">#postgres</div>
                    <div className="trend-stats">5.1K posts</div>
                </div>
                <div className="trend-item">
                    <div className="trend-name">#nextjs</div>
                    <div className="trend-stats">4.8K posts</div>
                </div>
            </div>

            <div className="widget-card card">
                <div className="widget-header">
                    <div className="icon-bg" style={{ color: '#0fa47f', background: '#dcfce7' }}>
                        <Users size={18} />
                    </div>
                    Who to follow
                </div>

                <div className="follow-item">
                    <div className="follow-info">
                        <div className="avatar">
                            <span style={{fontWeight: 700, fontSize: 13}}>MC</span>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>Maya Chen</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '12px' }}>@maya_codes</div>
                        </div>
                    </div>
                    <button className="follow-btn">Follow</button>
                </div>

                <div className="follow-item">
                    <div className="follow-info">
                        <div className="avatar">
                            <span style={{fontWeight: 700, fontSize: 13}}>OK</span>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>Otabek Karim</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '12px' }}>@otabek_ai</div>
                        </div>
                    </div>
                    <button className="follow-btn">Follow</button>
                </div>

                <div className="follow-item">
                    <div className="follow-info">
                        <div className="avatar">
                            <span style={{fontWeight: 700, fontSize: 13}}>LP</span>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>Leo Park</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '12px' }}>@leopixel</div>
                        </div>
                    </div>
                    <button className="follow-btn">Follow</button>
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
