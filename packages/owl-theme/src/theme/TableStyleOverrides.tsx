import styled from "@emotion/styled";

// style overrides for various browsers support

const TableWrapper: any = styled.div`
    table {
        border-spacing: 0;
        border-collapse: seperate;
        // border-radius: 12px;
        // overflow: hidden;
    }

    table tr:nth-child(odd) {
        background-color: #1c1c24;
    }

    table tr:nth-child(even) {
        background-color: #2c2c30;
    }
`;

export default TableWrapper;
