import React from 'react';
import styled from 'styled-components';

interface FacilityCardProps {
    image: string;
    name: string;
    description?: string;
}

const Card = styled.div`
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const FacilityName = styled.h3`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const FacilityDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
`;

const FacilityCard: React.FC<FacilityCardProps> = ({ image, name, description }) => {
    return (
        <Card>
            {image ?  <Image src={image} alt={name} /> : <></>}
            <Content>
                <FacilityName>{name}</FacilityName>
                {description && <FacilityDescription>{description}</FacilityDescription>}
            </Content>
        </Card>
    );
};

export default FacilityCard;