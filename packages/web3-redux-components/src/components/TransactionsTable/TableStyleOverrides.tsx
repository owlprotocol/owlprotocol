import styled from '@emotion/styled';

const TableWrapper = styled.div`
    table {
        border-spacing: 0;
        border-collapse: seperate;
    }

    table tr:nth-child(odd) {
        background-color: #1c1c24;
    }

    table tr:nth-child(even) {
        background-color: #2c2c30;
    }

    table th:first-child {
        border-top-left-radius: 12px;
    }

    table th:last-child {
        border-top-right-radius: 12px;
    }

    table tr:last-child td:first-child {
        border-bottom-left-radius: 12px;
    }

    table tr:last-child td:last-child {
        border-bottom-right-radius: 12px;
    }
`;

export default TableWrapper;
